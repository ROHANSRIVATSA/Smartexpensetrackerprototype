import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ExpenseListScreen } from './components/ExpenseListScreen';
import { InsightsScreen } from './components/InsightsScreen';
import type { Expense } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'processing' | 'expenses' | 'insights'>('home');
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 7.80,
      category: 'Coffee',
      description: 'Cappuccino and Croissant',
      date: new Date(),
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleScanReceipt = () => {
    setCurrentScreen('processing');
    // Simulate processing time
    setTimeout(() => {
      setCurrentScreen('expenses');
    }, 3000);
  };

  const handleSkipToExpenses = () => {
    setCurrentScreen('expenses');
  };

  const handleViewInsights = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentScreen('insights');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleBackToExpenses = () => {
    setCurrentScreen('expenses');
  };

  const handleAddExpense = (amount: number, category: string, description: string) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount,
      category,
      description,
      date: new Date(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    handleViewInsights(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Screen Content */}
        <div className="w-full h-full overflow-y-auto bg-white">
          {currentScreen === 'home' && (
            <HomeScreen 
              onScanReceipt={handleScanReceipt} 
              expenses={expenses}
              onCategoryClick={handleCategoryClick}
            />
          )}
          {currentScreen === 'processing' && (
            <ProcessingScreen onSkip={handleSkipToExpenses} />
          )}
          {currentScreen === 'expenses' && (
            <ExpenseListScreen 
              expenses={expenses}
              onViewInsights={handleViewInsights} 
              onBackToHome={handleBackToHome}
              onAddExpense={handleAddExpense}
            />
          )}
          {currentScreen === 'insights' && (
            <InsightsScreen 
              onBack={handleBackToExpenses}
              expenses={expenses}
              selectedCategory={selectedCategory}
            />
          )}
        </div>

        {/* Home Indicator (iPhone) */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full" />
      </div>
    </div>
  );
}