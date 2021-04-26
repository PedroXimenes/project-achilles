import control
from scipy import signal
from matplotlib import pyplot as plt
import json
import numpy as np

def analysis1(hnum=None, hden=None, gnum=None, gden=None):
    h_t, h_y, g_T, g_Y, series = StepResponse(hnum, hden, gnum, gden)
    
    mag2, phase2, omega = BodeDiagram(series)

    real, imag, klist = RootLocus(series)   

    poles = control.pole(series)
    zeros = control.zero(series)
    print(zeros)
    num_poles = len(poles)

    fb_data = { 
                "x_axis_ol": h_t.tolist(),
                "y_axis_ol": h_y.tolist(),
                "hnum": hnum,
                "hden": hden,
                "x_axis_cl":    g_T.tolist(),
                "y_axis_cl":   g_Y.tolist(),
                "omega":          omega.tolist(),
                "magnitude":      mag2.tolist(),
                "phase":          phase2.tolist(),
                "root_real": real.tolist(),
                "root_imag": imag.tolist(),
                "root_gain": klist.tolist(),
                "num_poles": num_poles
                }
    data = json.dumps(fb_data)

    return data


def StepResponse(hnum=None, hden=None, gnum=None, gden=None):
    #Process open loop step response
    sys = signal.TransferFunction(hnum, hden)
    t, y = signal.step(sys)

    # Calculate Step Response for Closed Loop System
    system = control.tf(hnum, hden)
    controller = control.tf(gnum, gden)
    series = control.series(system, controller)
    fb = control.feedback(series, 1, -1)

    T, Y = control.step_response(fb)

    return t, y, T, Y, series


def BodeDiagram(series=None):
    magnitude, phase, omega = control.bode(series, dB=True)
    mag_db = control.mag2db(magnitude)
    phase_deg = np.rad2deg(phase)

    return mag_db, phase_deg, omega

def RootLocus(series=None):
    rlist, klist = control.root_locus(series)
 
    total, shape = rlist.shape
    index = 0
    j = 0
    real = np.zeros((total, shape))
    imag = np.zeros((total,shape))

    for x in rlist:
        for i in x:
            if j == shape:
                j = 0
            real[index][j] = i.real
            imag[index][j] = i.imag

            j = j + 1
        index = index + 1

    return real, imag, klist
