import React, { useState } from 'react';
import { Plus, DollarSign, Receipt, Users, Calculator } from 'lucide-react';

interface ExpenseTrackerProps {
  tripId: string;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ tripId }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    amount: '',
    category: 'food',
    paidBy: 'you',
    splitWith: [] as string[]
  });

  const expenses = [
    {
      id: '1',
      title: 'Hotel Booking',
      amount: 450,
      category: 'accommodation',
      paidBy: 'John Doe',
      splitWith: ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Davis'],
      date: '2024-03-10',
      perPerson: 112.50
    },
    {
      id: '2',
      title: 'Airport Transportation',
      amount: 60,
      category: 'transport',
      paidBy: 'Sarah Smith',
      splitWith: ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Davis'],
      date: '2024-03-15',
      perPerson: 15.00
    },
    {
      id: '3',
      title: 'Dinner at Sushi Bar',
      amount: 120,
      category: 'food',
      paidBy: 'Mike Johnson',
      splitWith: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
      date: '2024-03-16',
      perPerson: 40.00
    }
  ];

  const members = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com' }
  ];

  const settlements = [
    { from: 'Sarah Smith', to: 'John Doe', amount: 97.50 },
    { from: 'Mike Johnson', to: 'John Doe', amount: 72.50 },
    { from: 'Emily Davis', to: 'John Doe', amount: 112.50 }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'transport': return 'bg-blue-100 text-blue-800';
      case 'accommodation': return 'bg-purple-100 text-purple-800';
      case 'activities': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would save to Supabase
    console.log('Adding expense:', expenseForm);
    setShowAddExpense(false);
    setExpenseForm({
      title: '',
      amount: '',
      category: 'food',
      paidBy: 'you',
      splitWith: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expense Tracker</h2>
          <p className="text-gray-600 mt-1">Track and split expenses with your group</p>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="mt-4 sm:mt-0 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Per Person</p>
              <p className="text-2xl font-bold text-gray-900">${(totalExpenses / members.length).toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Settlements</p>
              <p className="text-2xl font-bold text-gray-900">{settlements.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <div key={expense.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Receipt className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{expense.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        Paid by {expense.paidBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">${expense.perPerson.toFixed(2)} per person</p>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Split with:</span>
                <div className="flex -space-x-1">
                  {expense.splitWith.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-teal-600 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-xs text-white font-medium">
                        {member.charAt(0)}
                      </span>
                    </div>
                  ))}
                  {expense.splitWith.length > 3 && (
                    <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        +{expense.splitWith.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Settlement Summary</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{settlement.from}</span>
                    <span className="text-gray-500"> owes </span>
                    <span className="font-medium text-gray-900">{settlement.to}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  ${settlement.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expense Title
                </label>
                <input
                  type="text"
                  required
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Dinner at restaurant"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="activities">Activities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;