import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentTransactions = [
  {
    id: "1",
    name: "Grocery Shopping",
    amount: -85.32,
    date: "2023-07-15",
    category: "Food",
  },
  {
    id: "2",
    name: "Salary Deposit",
    amount: 3200.0,
    date: "2023-07-01",
    category: "Income",
  },
  {
    id: "3",
    name: "Electric Bill",
    amount: -120.5,
    date: "2023-07-10",
    category: "Utilities",
  },
  {
    id: "4",
    name: "Restaurant Dinner",
    amount: -65.75,
    date: "2023-07-08",
    category: "Food",
  },
  {
    id: "5",
    name: "Gas Station",
    amount: -45.0,
    date: "2023-07-12",
    category: "Transportation",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>{transaction.category[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.date}</p>
          </div>
          <div className={`ml-auto font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
            {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

