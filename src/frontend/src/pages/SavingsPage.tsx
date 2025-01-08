import React from 'react';
import MainLayout from '../layouts/MainLayout';
import SavingsGoalForm from '../components/Savings/SavingsGoalForm';
import SavingsGoalDisplay from '../components/Savings/SavingsGoalDisplay';
import SavingsGoalRecommendation from '../components/Savings/RecommendationDisplay';

const SavingsPage: React.FC = () => {
  const userId = localStorage.getItem('userId') || '';

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SavingsGoalForm userId={userId} />
          </div>
          <div>
            <SavingsGoalDisplay userId={userId} />
          </div>
        </div>
        <SavingsGoalRecommendation userId={userId} />
      </div>
    </MainLayout>
  );
};

export default SavingsPage;
