class Person:
    def __init__(self):
        self.person_name = ""
        self.times = 0
        self.filename = ""

    def set_filename(self, filename):
        self.filename = filename

    def set_name(self, name):
        self.person_name = name

    def get_name(self):
        return self.name

    def add_times(self):
        self.times += 1

    def get_times(self):
        return self.times