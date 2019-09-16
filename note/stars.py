#%%
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import scipy as sp
import pandas as pd
import json

def convertDateTime(name):
  name = name.split('/')
  print(name)
  fname = 'data/stars/' + name[0] +'_' + name[1] + '_stars.json'
  js_engine = pd.read_json(fname)
  stars = pd.to_datetime(js_engine['staredAts'])
  return stars

#%%
mjs = convertDateTime('cesanta/mjs')
mjs.hist()

#%%
duktape = convertDateTime('svaarala/duktape')
duktape.hist()

#%%
hermes = convertDateTime('facebook/hermes')
hermes.hist()

#%%

# それぞれ比べる
f = open("data/assets/javascript_engine_repositorys.json")
data = json.load(f)
repos = data['javascript_engine_repositorys']
for i in repos:
  name = i['name'].split('/')
  fname = 'data/stars/' + name[0] +'_' + name[1] + '_stars.json'
  js_engine = pd.read_json(fname)
  stars = pd.to_datetime(js_engine['staredAts'])
  stars.hist()
f.close()


#%%
