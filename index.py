#%%
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import scipy as sp
import pandas as pd

x = np.linspace(0, 20, 100)
plt.plot(x, np.sin(x))
plt.show()


#%%
json = pd.read_json('./output.json')
json['starredAts'] = pd.to_datetime(json['starredAts'])
json.set_index('starredAts', inplace=True)
print(pd.date_range('2019-03-27', periods=5, freq='D'))

#%%


#%%
