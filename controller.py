import control
import control.matlab
import math
from numpy.lib.polynomial import polyadd, polymul
from scipy import signal
import json
import numpy as np

def calculate(data=None):
    hnum, hden, gnum, gden = separateSystemOl(data)
    clNum, clDen = clSystem(hnum, hden, gnum, gden)

    h_t, h_y, g_t, g_y, series, MF = stepResponse(hnum, hden, gnum, gden)
    S = stepInfo(MF)
    yss = finalValue(MF)

    mag, phase, omega = bodeDiagram(series)
    bode_info = bodeInfo(series)
    
    real, imag, klist, wn, zeta = rootLocus(series)   

    poles = control.pole(series) 
    zeros = control.zero(series)
    zero_real, zero_imag = separateRealImag(zeros)

    num_poles = len(poles)
    num_zeros = len(zeros) 

    fb_data = { 
                "x_axis_ol": h_t.tolist(),
                "y_axis_ol": h_y.tolist(),
                "hnum": hnum,
                "hden": hden,
                "gnum": gnum,
                "gden": gden,
                "x_axis_cl":    g_t.tolist(),
                "y_axis_cl":   g_y.tolist(),
                "omega":          omega.tolist(),
                "magnitude":      mag.tolist(),
                "phase":          phase.tolist(),
                "root_real": real.tolist(),
                "root_imag": imag.tolist(),
                "root_gain": klist.tolist(),
                "num_poles": num_poles,
                "num_zeros": num_zeros,
                "zero_real": zero_real,
                "zero_imag": zero_imag,
                "step_info": S,
                "bode_info": bode_info,
                "yss": yss,
                "cl_num": clNum,
                "cl_den": clDen,
                "wn": wn,
                "zeta": zeta,
                }
    data = json.dumps(fb_data)
  
    return data

def separateSystemOl(data):
    hnum = list(map(float,data['hnum'].split(',')))
    hden = list(map(float,data['hden'].split(',')))
    gnum = list(map(float,data['gnum'].split(',')))
    gden = list(map(float,data['gden'].split(',')))
    return hnum, hden, gnum, gden

def clSystem(hnum, hden, gnum, gden):
    num = polymul(hnum, gnum)
    den = polymul(hden, gden)
    clNum = num
    clDen = polyadd(num, den)
    clNumstr = str(clNum).replace('. ',',').replace('.]','').replace('[','').replace(']','')
    clDenstr = str(clDen).replace('. ',',').replace('.]','').replace('[','').replace(']','')
   
    return clNumstr, clDenstr

def stepResponse(hnum=None, hden=None, gnum=None, gden=None):
    try:
        #Process open loop step response
        sys = signal.TransferFunction(hnum, hden)
        t, y = signal.step(sys)

        # Calculate Step Response for Closed Loop System
        system = control.tf(hnum, hden)
        controller = control.tf(gnum, gden)
        series = control.series(system, controller)
        MF = control.feedback(series, 1, -1)
        print(series, MF)  
        
        T, Y = control.step_response(MF)       


        return t, y, T, Y, series, MF
    
    except:
        print("something went wrong")
             
def stepInfo(TF):
    polesPos = verifyPolesPositive(TF)
    yss = finalValue(TF)
    if not polesPos:
        return control.timeresp.step_info(TF,finalValue=yss,RiseTimeLimits=(0,1))
    return None

def verifyPolesPositive(series):
    poles_MF = control.pole(series)
    poles_real, _ = separateRealImag(poles_MF)
    for i in poles_real:
        if i > 0:
            return True
    return False
    
def bodeDiagram(series=None):
    magnitude, phase, omega = control.bode(series, dB=True)
    mag_db = control.mag2db(magnitude)
    phase_deg = np.rad2deg(phase)
    
    return mag_db, phase_deg, omega

def bodeInfo(series):
    gm, pm, wg, wp = control.margin(series)
    bode_info = {
                'gainMargin': str(round(gm,2)),
                'phaseMargin': str(round(pm,2)),
                'criticFreq': str(round(wg,2)),
                'gainFreq': str(round(wp,2)),
                }
    return bode_info
    
def rootLocus(series=None):
    try:
        rlist, klist = control.root_locus(series)
        
        total, shape = rlist.shape
        index = 0
        j = 0
        real = np.zeros((total, shape))
        imag = np.zeros((total, shape))
        wn   = []
        zeta = []
        for x in rlist:
            for i in x:
                if j == shape:
                    j = 0
                real[index][j] = i.real
                imag[index][j] = i.imag
                if(j == 0):
                    w_n = math.sqrt(i.real**2 + i.imag**2)            
                    wn.append(np.round(w_n,3))
                    zeta.append(np.round(-i.real/w_n,3))

                j = j + 1
            index = index + 1

        return real, imag, np.round(klist,3), wn, zeta
    except ValueError:
        print('error:', ValueError)

def separateRealImag(array):
    part_real = []
    part_imag = []
    for i in array:
        part_imag.append(np.imag(i))
        part_real.append(np.real(i))
    return part_real, part_imag

def finalValue(TF):
    polesPos = verifyPolesPositive(TF)
    if not polesPos:
        num, den = separateTF(TF)  
        return num[-1]/den[-1]  
    return None

def checkSettlingTime(specifications, S):
    settlingTimeInput = specifications.settlingTime
    SettlingTime = S['SettlingTime'] 
    sucesso_ts = False

    if(SettlingTime <= settlingTimeInput):
        sucesso_ts = True
    return sucesso_ts

def checkOvershoot(specifications, S, yss):
    overshootInput = specifications.overshoot
    Peak = S['Peak']
    sucesso_overshoot = False
    peakValue = yss * overshootInput / 100 + yss

    if(Peak <= peakValue):
        sucesso_overshoot = True
    return sucesso_overshoot

def checkYss(specifications, S, yss):
    InfValue = S['SteadyStateValue']
    varSteadyStateInput= specifications.varSteadyState/100 # variação (%) no regime estacionário
    sucesso_yss = False
   
    # Variação do valor estacionário para ser considerado em regime permanente
    sup_margin = (1. + varSteadyStateInput) * yss # varSteadyState% acima do valor estacionário
    inf_margin = (1. - varSteadyStateInput) * yss # varSteadyState% abaixo do valor estacionário

    if(InfValue >= inf_margin and InfValue <= sup_margin):
        sucesso_yss = True
    return sucesso_yss

def checkBounds(specifications):
    series = 0
    MF = control.feedback(series, 1, -1)
    S = stepInfo(MF)

    yss = finalValue(MF)
    sucesso_ts = checkSettlingTime(specifications, S)
    sucesso_overshoot = checkOvershoot(specifications, S, yss)
    sucesso_yss = checkYss(specifications, S, yss)

    fb_data = {

                "sucesso_ts": sucesso_ts,
                "sucesso_overshoot": sucesso_overshoot,
                "sucesso_yss": sucesso_yss,

    }
    data = json.dumps(fb_data)
    
    return data

def separateTF(series):
    numerador = series.num[0][0]
    denominador = series.den[0][0]
    return numerador, denominador