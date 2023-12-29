import simpy


env = simpy.Environment()

ResourceSlot = {
    "counter": simpy.Resource(env=env, capacity=1),
    "machine_A": simpy.Resource(env=env, capacity=1),
    "machine_B": simpy.Resource(env=env, capacity=1),
}

'''
Here a configuration for a container must be 
eg:- [count of similar containers, simpy implementation of container]
'''
ContainerSlot = {
    "container1" : [3,simpy.Container(env=env, capacity=100, init=0)],
    "container2" : [2,simpy.Container(env=env, capacity=100, init=0)],
    "container3" : [1,simpy.Container(env=env, capacity=100, init=0)],
}
