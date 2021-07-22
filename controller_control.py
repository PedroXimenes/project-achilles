import control
import control.matlab
from scipy import signal
# from matplotlib import pyplot as plt
import json
import numpy as np

def calculate(hnum=None, hden=None, gnum=None, gden=None):
    h_t, h_y, g_t, g_y, series, S = stepResponse(hnum, hden, gnum, gden)
    
    mag, phase, omega, bode_info = bodeDiagram(series)
    print(bode_info)
    real, imag, klist = rootLocus(series)   

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
                }
    data = json.dumps(fb_data)
  
    return data

def stepResponse(hnum=None, hden=None, gnum=None, gden=None):
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
    S = stepInfo(MF)
    print(S)

    return t, y, T, Y, series, S

def stepInfo(series):
    polesPos = verifyPolesPositive(series)
    zerosPos = verifyZerosPositive(series)
    if not polesPos:
        return control.timeresp.step_info(series,zero_pos=zerosPos)
    return None

def verifyPolesPositive(series):
    poles_MF = control.pole(series)
    poles_real, _ = separateRealImag(poles_MF)
    for i in poles_real:
        if i > 0:
            return True
    return False

def verifyZerosPositive(series):
    zeros_MF = control.zero(series)
    zeros_real, _ = separateRealImag(zeros_MF)
    for i in zeros_real:
        if i > 0:
            return True
    return False
    

def bodeDiagram(series=None):
    magnitude, phase, omega = control.bode(series, dB=True)
    mag_db = control.mag2db(magnitude)
    phase_deg = np.rad2deg(phase)
    bode_info = bodeInfo(series)
    return mag_db, phase_deg, omega, bode_info

def bodeInfo(series):
    gm, pm, wg, wp = control.margin(series)
    # Margem de ganho (GM): diferença para o ganho atingir o zero em WP  
    # Margem de fase (PM): ângulo que falta para completar 180 graus em WG 
    # Frequência de cruzamento de ganho (WG): quando o ganho cruza o zero
    # Frequência de cruzamento de fase (WP): ponto que a fase cruza -180 graus
    bode_info = {
                'gainMargin': str(round(gm,2)),
                'phaseMargin': str(round(pm,2)),
                'gainFreq': str(round(wg,2)),
                'phaseFreq': str(round(wp,2)),
                }
    return bode_info
    
  
def rootLocus(series=None):
    rlist, klist = control.root_locus(series)
    
    total, shape = rlist.shape
    index = 0
    j = 0
    real = np.zeros((total, shape))
    imag = np.zeros((total, shape))
    
    for x in rlist:
        for i in x:
            if j == shape:
                j = 0
            real[index][j] = i.real
            imag[index][j] = i.imag

            j = j + 1
        index = index + 1

    return real, imag, np.round(klist,3)

def separateRealImag(array):
    parte_real = []
    parte_imag = []
    for i in array:
        parte_imag.append(np.imag(i))
        parte_real.append(np.real(i))
    return parte_real, parte_imag