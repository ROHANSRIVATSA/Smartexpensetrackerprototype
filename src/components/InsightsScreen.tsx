import { ChevronLeft, TrendingUp } from 'lucide-react@0.487.0';
import { Card } from './ui/card';
import { Button } from './ui/button';
import type { Expense } from '../types';

interface InsightsScreenProps {
  onBack: () => void;
  expenses: Expense[];
  selectedCategory: string | null;
}

export function InsightsScreen({ onBack, expenses, selectedCategory }: InsightsScreenProps) {
  // Calculate category spending
  const categoryExpenses = selectedCategory
    ? expenses.filter(expense => expense.category === selectedCategory)
    : [];
  
  const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate average (mock - in real app would compare with historical data)
  const averageSpending = categoryTotal > 0 ? categoryTotal * 0.8 : 0; // Simulate 20% below
  const percentageAbove = averageSpending > 0 
    ? ((categoryTotal - averageSpending) / averageSpending * 100).toFixed(0)
    : '0';

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <span className="text-gray-900">Insights</span>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto space-y-4">
        {/* Main Insight Card */}
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-4">
                You spent <span className="font-semibold">${categoryTotal.toFixed(2)}</span> on {selectedCategory?.toLowerCase() || 'expenses'} this week.{' '}
                {categoryTotal > 0 && (
                  <span className="text-teal-700">{percentageAbove}% above average</span>
                )}
              </p>
              <p className="text-gray-600 mb-4">
                Would you like to set a reminder or budget limit for this category?
              </p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={onBack}>
                Explore
              </Button>
            </div>
          </div>
        </Card>

        {/* Expense Details */}
        {categoryExpenses.length > 0 && (
          <Card className="p-6 bg-gray-50">
            <h3 className="text-gray-900 mb-4">Recent {selectedCategory} Expenses</h3>
            <div className="space-y-3">
              {categoryExpenses.map((expense) => {
                const expenseDate = expense.date instanceof Date 
                  ? expense.date 
                  : new Date(expense.date);
                
                return (
                  <div key={expense.id} className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-900">{expense.description || 'Expense'}</p>
                      <p className="text-gray-500">
                        {expenseDate.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-900">${expense.amount.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Additional Insight Placeholder 2 */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-purple-200 rounded w-full" />
              <div className="h-4 bg-purple-200 rounded w-5/6" />
              <div className="h-4 bg-purple-200 rounded w-3/6" />
              <div className="pt-2">
                <div className="h-9 bg-purple-200 rounded w-full" />
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Insight Placeholder 3 */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-amber-200 rounded w-full" />
              <div className="h-4 bg-amber-200 rounded w-4/6" />
              <div className="pt-2">
                <div className="h-9 bg-amber-200 rounded w-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}