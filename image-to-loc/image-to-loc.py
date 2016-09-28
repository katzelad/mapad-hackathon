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
    
def overlay_image(bottom, top, loc, scale):
    top = cv2.resize(top, (0, 0), fx=scale, fy=scale)
    for x in xrange(0, len(top)):
        for y in xrange(0, len(top[0])):
            bottom[loc[0] + x][loc[1] + y] = top[x][y]
            
def match_images(image, pattern):
    scales = np.logspace(-0.5, 0, 50)
    best_score = 0
    for scale in scales:
        scaled_pattern = cv2.resize(pattern, (0, 0), fx=scale, fy=scale)
        match_mat = cv2.matchTemplate(image, scaled_pattern, cv2.TM_CCOEFF)
        _, score, _, loc = cv2.minMaxLoc(match_mat)
        if score > best_score:
            best_score, best_loc, best_scale = score, loc, scale
    return best_loc, best_scale, best_score

image = read_image("rg.png")
pattern = read_image("rg_pattern5.png")
loc, scale, score = match_images(image, pattern)
mod_image = np.copy(image)
overlay_image(mod_image, pattern, loc, scale)

print "location:", loc
print "scale:", scale
print "score:", score
display_image(image)
display_image(pattern)
display_image(mod_image)
