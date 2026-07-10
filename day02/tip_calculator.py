# Step 1: Store a bill total (ETB) and number of people in variables
bill_total = 1200.00  
friends = ["Abebe", "Aster", "Chaltu", "Dawit"]  
number_of_people = len(friends)

# Step 2: Write a function split_bill(total, people, tip_rate=0.10)
def split_bill(total, people, tip_rate=0.10):
    total_with_tip = total * (1 + tip_rate)
    return total_with_tip / people

# Step 3: Use it to compute the per-person amount, tip included
share = split_bill(bill_total, number_of_people)

# Step 4: Loop over a list of names and print each person's share
print("--- TeleBirr Tip Calculator ---")
for name in friends:
    print(f"{name}'s share: {share:.2f} ETB")
