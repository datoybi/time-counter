export const ItemSkeleton = () => {
  return (
    <div className="animate-pulse bg-red flex items-center justify-center gap-2 mt-5">
      <div className="h-14 bg-gray-200 rounded-full dark:bg-gray-700 w-[31.5rem] mr-3" />
      <div className="h-14 bg-gray-200 rounded-full dark:bg-gray-700 w-[16.5rem]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ListSkeleton = () => {
  return (
    <>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </>
  );
};
