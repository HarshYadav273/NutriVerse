import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatMacro } from '../utils/formatCalories';

const COLORS = {
  protein: '#3B82F6',
  carbs: '#FBBF24',
  fat: '#F43F5E',
};

const NutritionChart = ({ protein, carbs, fat, calories }) => {
  const data = [
    { name: 'Protein', value: protein * 4, grams: protein },
    { name: 'Carbs', value: carbs * 4, grams: carbs },
    { name: 'Fat', value: fat * 9, grams: fat },
  ];

  const colorArr = [COLORS.protein, COLORS.carbs, COLORS.fat];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={colorArr[idx]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-heading font-bold text-white">{calories}</span>
          <span className="text-xs text-text-secondary">kcal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        {[
          { label: 'Protein', grams: protein, color: COLORS.protein },
          { label: 'Carbs', grams: carbs, color: COLORS.carbs },
          { label: 'Fat', grams: fat, color: COLORS.fat },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <div className="text-sm">
              <span className="text-text-secondary">{item.label}</span>
              <span className="text-white font-semibold ml-1">{formatMacro(item.grams)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionChart;
