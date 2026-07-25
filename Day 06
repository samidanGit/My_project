class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance} ETB")

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, interest_rate=0.05):
        super().__init__(owner, number, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)


if __name__ == "__main__":
    savings = SavingsAccount("Samuel", "102", 1000, 0.1)
    savings.statement()
    savings.add_interest()
    savings.statement()

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft_limit=500):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance + self.overdraft_limit:
            raise ValueError("Overdraft limit exceeded")
        self.__balance -= amount

    def statement(self):
        print(f"[Current] Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB (Overdraft limit: {self.overdraft_limit} ETB)")


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown type: {kind}")
