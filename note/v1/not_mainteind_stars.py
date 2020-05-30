
#%%
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import scipy as sp
import pandas as pd
import json
import datetime
import statsmodels.api as sm

#%%

# TODO: 
# - refactor class
# - snake case

def convertDataSiries(name):
  name = name.split('/')
  fname = 'data/stars/' + name[0] +'_' + name[1] + '_stars.json'
  repository = pd.read_json(fname)
  return pd.Series(pd.to_datetime(repository['staredAts'])).dt.date

def github_life_series():
  github_life = np.arange('2008-01-01', datetime.date.today(), dtype='datetime64[D]')
  return pd.Series(github_life, name='t').dt.date

def create_star_df(name):
  github_life = github_life_series()
  repository = convertDataSiries(name)
  star_counts = []
  for d in github_life:
    count = repository[repository == d].count()
    star_counts.append(count)

  return pd.DataFrame(star_counts, columns=['star'])
  

def plotStars(name):
  star_df = create_star_df(name)
  github_life = github_life_series()
  result = pd.concat([star_df, github_life], axis=1)
  result.plot(x='t', y='star', ylim=[0, 100])

def get_x_index(name):
  result = create_star_df(name)
  arr = result['star'].values.tolist()
  return h_index(arr)

def h_index(citations):
  n = len(citations)
  equal_h = [0] * (n+1)
  for h in range(n):
      if citations[h] >= n: equal_h[n] += 1
      else: equal_h[citations[h]] += 1
  
  s = 0
  for h in range(n,0, -1):
      s += equal_h[h]
      if s>=h:
          return h
  return 0


#%%
f = open('data/assets/not maintained_repositorys.json')
repos = json.load(f)

for name in repos['not_maintained_repository']:
  print(name)
  print(get_x_index(name))
f.close()

#%%
plotStars('yarnpkg/yarn')


#%%

# not_maintained なレポジトリを集結させた
f = open('data/assets/not maintained_repositorys.json')
repos = json.load(f)

for name in repos['not_maintained_repository']:
  plotStars(name)

f.close()

#%%

f = open('data/assets/javascript_engine_repositorys.json')
repos = json.load(f)

for name in repos['javascript_engine_repositorys']:
  plotStars(name)

f.close()


#%%
# v8/v8
# elastic/elasticsearch
# arduino/Arduino
# bitcoin/bitcoin


plotStars('bitcoin/bitcoin')


def acsPlot(name):
  star_df = create_star_df(name)
  github_life = github_life_series()
  result = pd.concat([star_df, github_life], axis=1)
  star_counts = pd.Series(result['star'], dtype='float')
  star_counts.index = pd.to_datetime(result['t'])
  # asc = sm.tsa.stattools.acf(star_counts, nlags=40)
  star_counts.plot()
  fig = plt.figure(figsize=(12,8))
  ax1 = fig.add_subplot(211)
  fig = sm.graphics.tsa.plot_acf(star_counts, lags=40, ax=ax1)
  ax2 = fig.add_subplot(212)
  fig = sm.graphics.tsa.plot_pacf(star_counts, lags=40, ax=ax2)


#%%
acsPlot('elastic/elasticsearch')


#%%
acsPlot('opencv/opencv')


#%%

acsPlot('nervgh/angular-file-upload')
