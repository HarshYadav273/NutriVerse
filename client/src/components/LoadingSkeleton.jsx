const MealCardSkeleton = () => (
  <div className="bg-surface rounded-card border border-card-border overflow-hidden">
    <div className="h-48 skeleton" />
    <div className="p-4 space-y-3">
      <div className="h-5 w-3/4 skeleton" />
      <div className="flex gap-4">
        <div className="h-4 w-20 skeleton" />
        <div className="h-4 w-16 skeleton" />
      </div>
      <div className="h-2 w-full skeleton" />
      <div className="flex justify-between">
        <div className="h-3 w-12 skeleton" />
        <div className="h-3 w-12 skeleton" />
        <div className="h-3 w-12 skeleton" />
      </div>
    </div>
  </div>
);

const ChatSkeleton = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full skeleton" />
    <div className="space-y-2 flex-1 max-w-[60%]">
      <div className="h-12 skeleton rounded-2xl" />
      <div className="h-8 w-1/2 skeleton rounded-2xl" />
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-48 h-48 rounded-full skeleton" />
    <div className="flex gap-6">
      <div className="h-4 w-16 skeleton" />
      <div className="h-4 w-16 skeleton" />
      <div className="h-4 w-16 skeleton" />
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="h-64 skeleton" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-48 skeleton" />
      <div className="h-48 skeleton" />
    </div>
  </div>
);

export { MealCardSkeleton, ChatSkeleton, ChartSkeleton, DashboardSkeleton };
