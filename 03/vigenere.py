print("Welcome")
print("Please enter the correspnding number")
print("1 - Encrypt")
print("2 - Decrypt")
print("3 - Exit")

while True:
    selected = input("Choice:")
    if selected not in ["1", "2", "3"]:
        print("please select correct option")
        continue
    selected = int(selected)
    if selected is 1 or selected is 2:
        inp1 = input("Enter Word:")
        print("Your word is {}".format(inp1))
    else:
        break

print("Visit us again")