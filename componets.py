import simpy
from ZIM.ZComponets import IRes, ZStore
import random


class Modeling_Machien(IRes):
    def __init__(self, env, name, workflow_name):
        super().__init__(
            env, simpy.Resource(env, capacity=1),
            name,
            workflow_name=workflow_name
        )

    @IRes.run
    def run(self, entity):
        # print(f"Modeling_Machien12 -> {entity}")

        yield self.env.timeout(random.randint(18, 20))

    def check(self):
        print("Modeling_Machien is working")


class Inspection_Machien(IRes):
    def __init__(self, env, name, workflow_name):
        super().__init__(
            env, simpy.Resource(env, capacity=1),
            name,
            workflow_name=workflow_name
        )

    @IRes.run
    def run(self, entity):
        yield self.env.timeout(random.randint(1, 3))


class Packing_Machien(IRes):
    def __init__(self, env, name, workflow_name):
        super().__init__(
            env, simpy.Resource(env, capacity=1),
            name,
            workflow_name=workflow_name
        )

    @IRes.run
    def run(self, entity):
        yield self.env.timeout(random.randint(10, 15))


class Modeling_Store(ZStore):
    def __init__(self, env, workflow_name):
        super().__init__(
            env,
            simpy.Store(env, capacity=100),
            "Modeling_Store",
            workflow_name=workflow_name,
        )

class Inspection_Store(ZStore):
    def __init__(self, env, workflow_name):
        super().__init__(
            env,
            simpy.Store(env, capacity=100),
            "Inspection_Store",
            workflow_name=workflow_name,
        )

class Packing_Store(ZStore):
    def __init__(self, env, workflow_name):
        super().__init__(
            env,
            simpy.Store(env, capacity=100),
            "Packing_Store",
            workflow_name=workflow_name,
        )
