import { Coffee, UtensilsCrossed, Car, Plus, ChevronLeft, DollarSign } from 'lucide-react@0.487.0';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import type { Expense } from '../types';

interface ExpenseListScreenProps {
  expenses: Expense[];
  onViewInsights: () => void;
  onBackToHome: () => void;
  onAddExpense: (amount: number, category: string, description: string) => void;
}

export function ExpenseListScreen({ expenses, onViewInsights, onBackToHome, onAddExpense }: ExpenseListScreenProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Calculate totals by category
  const getCategoryTotal = (categoryName: string): number => {
    return expenses
      .filter(expense => expense.category === categoryName)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Calculate overall total
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categories = [
    { name: 'Food', icon: UtensilsCrossed },
    { name: 'Coffee', icon: Coffee },
    { name: 'Transport', icon: Car },
  ];

  const handleAddExpense = () => {
    if (amount && category) {
      onAddExpense(parseFloat(amount), category, description);
      setOpen(false);
      setAmount('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBackToHome} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="text-gray-900">Weekly Spending</span>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto pb-24">
        {/* Spending Circle */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-48 h-48 mb-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onViewInsights}>
            {/* Outer circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#E2E8F0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#2C7A7B"
                strokeWidth="8"
                fill="none"
                strokeDasharray="553"
                strokeDashoffset={553 - (553 * (totalSpending / 300))}
                strokeLinecap="round"
              />
            </svg>
            {/* Center amount */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-900">${totalSpending.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-gray-500">Total this week</p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3 mb-6">
          {categories.map((category) => {
            const total = getCategoryTotal(category.name);
            const hasExpenses = total > 0;

            return (
              <Card
                key={category.name}
                onClick={hasExpenses ? onViewInsights : undefined}
                className={`p-4 flex items-center justify-between ${
                  hasExpenses ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    hasExpenses ? 'bg-teal-50' : 'bg-gray-100'
                  }`}>
                    <category.icon className={`w-6 h-6 ${
                      hasExpenses ? 'text-teal-600' : 'text-gray-400'
                    }`} strokeWidth={2} />
                  </div>
                  <span className="text-gray-900">{category.name}</span>
                </div>
                {hasExpenses ? (
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </Card>
            );
          })}

          {/* Empty Placeholders */}
          {[1, 2].map((i) => (
            <Card key={`empty-${i}`} className="p-4 flex items-center justify-between opacity-40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <span className="text-gray-300">—</span>
            </Card>
          ))}
        </div>

        {/* Hint text */}
        <p className="text-center text-gray-400 mt-6">
          {expenses.length > 0 ? 'Tap on categories to view insights' : 'Add your first expense'}
        </p>
      </div>

      {/* Floating Add Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="absolute bottom-24 right-8 w-14 h-14 bg-teal-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center text-white"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Add a new expense manually. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <div className="col-span-3">
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Optional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddExpense}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!amount || !category}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}