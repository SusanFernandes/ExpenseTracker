"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddExpenseModal } from "@/components/add-expense-modal";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialExpenses = [
  {
    id: 1,
    name: "Groceries",
    amount: 50.25,
    category: "Food",
    date: "2023-07-15",
  },
  {
    id: 2,
    name: "Gas",
    amount: 30.0,
    category: "Transportation",
    date: "2023-07-14",
  },
  {
    id: 3,
    name: "Movie Tickets",
    amount: 25.5,
    category: "Entertainment",
    date: "2023-07-13",
  },
  {
    id: 4,
    name: "Dinner",
    amount: 45.75,
    category: "Food",
    date: "2023-07-12",
  },
  {
    id: 5,
    name: "Electricity Bill",
    amount: 80.0,
    category: "Utilities",
    date: "2023-07-11",
  },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredAndSortedExpenses = expenses
    .filter(
      (expense) =>
        expense.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || expense.category === categoryFilter),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
    });

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
    setIsAddModalOpen(false);
  };

  const exportToPdf = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Expenses Report", 14, 22);

    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Create table
    const tableColumn = ["Name", "Amount", "Category", "Date"];
    const tableRows = filteredAndSortedExpenses.map((expense) => [
      expense.name,
      `$${expense.amount.toFixed(2)}`,
      expense.category,
      expense.date,
    ]);

    // Calculate total
    const total = filteredAndSortedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    tableRows.push(["Total", `$${total.toFixed(2)}`, "", ""]);

    // Generate the PDF table using the imported autoTable function
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 139, 202] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("expenses_report.pdf");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>Add Expense</Button>
          <Button
            variant="outline"
            onClick={exportToPdf}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </Button>
        </div>
      </div>
      <div className="flex space-x-4">
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.name}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
