import cv2
i=cv2.imread('C:\\Users\\Vinay Reddy\\Downloads\\2346220.jpg', 1)
h,w=i.shape[:2]
print(h,w)
print(i)