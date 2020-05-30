#%%
from tslearn.preprocessing import TimeSeriesScalerMeanVariance, TimeSeriesResampler
d = TimeSeriesScalerMeanVariance(mu=0. , std=1.).fit_transform([[0, 3, 6]])
print(d)


# %%
