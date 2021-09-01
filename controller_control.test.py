import unittest
from controller_control import *

class TestController(unittest.TestCase):

    def test_calculate(self):
        data = {
            "gden": "1",
            "gnum": "1",
            "hden": "1,2,3",
            "hnum": "1,2"    
        } 
        response = calculate(data)
        self.assertIsNotNone(response)

    def separate_test(self):
        data = {
            "gden": "1",
            "gnum": "1",
            "hden": "1,2,3",
            "hnum": "1,2"    
        } 
        hnum, hden, gnum, gden = separateSystemOl(data)
        eHnum = [1,2]
        self.assertEqual(hnum,eHnum, "Should be [1,2]")
        eGnum = [1]
        self.assertEqual(gnum,eGnum, "Should be [1]")
        eHden = [1,2,3]
        self.assertEqual(hden,eHden, "Should be [1,2,3]")
        eGden = [1]
        self.assertEqual(gden,eGden, "Should be [1]")


    def clSystem_test(self):
        hnum = 1,2
        hden = 1,2,3
        gnum = 1
        gden = 1

        clNum, clDen = clSystem(hnum, hden, gnum, gden)
        eClNum = "1,2"
        eClDen = "1,3,5"

        self.assertEqual(clNum,eClNum, "Should be '1,2'")
        self.assertEqual(clDen,eClDen, "Should be '1,3,5'")

    def step_test(self):
        hnum = 1,2
        hden = 1,2,3
        gnum = 1
        gden = 1
        _, _, _, _, series, S, yss = stepResponse(hnum, hden, gnum, gden)
        eYss = 0.4
        eSeries = control.tf([1,2],[1,2,3])      
        self.assertEqual(series,eSeries)
        self.assertEqual(yss,eYss, "Should be 0.4")
        eStepInfo = {
            "Overshoot": 17.137775029118917,
            "Overshoot2": 17.137775029118917,
            "Peak": 0.4641699693470358,
            "PeakTime": 1.135941979210396,
            "RiseTime": 0.6140226914650788,
            "SettlingMax": 0.4641699693470358,
            "SettlingMin": 0.39625661425235625,
            "SettlingTime": 2.3332862275672994,
            "SteadyStateValue": 0.3962598480564013,
            "Undershoot": 0,
            "Undershoot2": -100,
        }
        self.assertEqual(S, eStepInfo)

    def bode_test(self):
        series = control.tf([1,2],[1,2,3])
        eBodeInfo = {
            "gainFreq": "nan",
            "gainMargin": "inf",
            "phaseFreq": "nan",
            "phaseMargin": "inf"
        }
        _, _, _, bode_info = bodeDiagram(series)
        self.assertEqual(bode_info, eBodeInfo)

    def separateIR_test(self):
        series = control.tf([1,2],[1,2,3])
        zeros = control.zero(series)
        zero_real, zero_imag = separateRealImag(zeros)
        eReal = [-2]
        eImg = [0]
        self.assertEqual(zero_real,eReal, "Should be [-2]")
        self.assertEqual(zero_imag,eImg, "Should be [0]")

    def numPoles_test(self):
        series = control.tf([1,2],[1,2,3])
        poles = control.pole(series)         
        num_poles = len(poles)
        self.assertEqual(num_poles, 2, "Should be 2")
    
    def numZeros_test(self):
        series = control.tf([1,2],[1,2,3])
        zeros = control.zero(series)         
        num_zeros = len(zeros) 
        self.assertEqual(num_zeros, 1, "Should be 1") 

if __name__ == '__main__':
    unittest.main()