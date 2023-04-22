import os
import json

gallery = os.listdir("images/gallery")
save = json.load(open("gallery-fetch.json"))

save = []

for image in gallery:
    info = { "path": f'../images/gallery/{image}'}
    save.append(info)

json.dump(save, open("gallery-fetch.json", 'w'), indent=4)