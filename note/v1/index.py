#%%
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import scipy as sp
import pandas as pd
import json

x = np.linspace(0, 20, 100)
plt.plot(x, np.sin(x))
plt.show()

#%%
# stars
repositoriStars = pd.read_json('data/output.json')
stars = pd.to_datetime(repositoriStars['staredAts'])

stars.describe()
stars.hist()

t = pd.date_range(str(stars.min()), str(stars.max()))


#%%
