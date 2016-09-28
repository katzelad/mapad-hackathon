# -*- coding: utf-8 -*-

import cv2
import os
import numpy as np

def read_image(file_name):
    return cv2.imread(os.path.join("res", file_name))

def display_image(image):
    cv2.imshow("hackathon", image)
    cv2.waitKey()
    cv2.destroyAllWindows()
    
def overlay_image(bottom, top, loc):
    for x in xrange(0, len(top)):
        for y in xrange(0, len(top[0])):
            bottom[loc[0] + x][loc[1] + y] = top[x][y]
    
image = read_image("rg.png")
pattern = read_image("rg_pattern_dirty.png")
match_mat = cv2.matchTemplate(image, pattern, cv2.TM_CCOEFF)
_, score, _, loc = cv2.minMaxLoc(match_mat)
mod_image = np.copy(image)
overlay_image(mod_image, pattern, loc)

print "location:", loc
print "score:", score
display_image(image)
display_image(mod_image)