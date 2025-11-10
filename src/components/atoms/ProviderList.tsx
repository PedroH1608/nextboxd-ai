// filepath: src/components/atoms/ProviderList.tsx
type ProviderListProps = {
  title: string;
  providers: { logo_path: string; provider_name: string }[];
};

export default function ProviderList({ title, providers }: ProviderListProps) {
  if (!providers || providers.length === 0) return null;

  return (
    <div>
      <h4 className="font-semibold text-foreground-secondary">{title}</h4>
      <div className="flex flex-wrap gap-2 mt-1">
        {providers.map((provider) => (
          <div
            key={provider.provider_name}
            className="flex items-center gap-2 bg-input p-1 rounded"
          >
            <img
              src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
              alt={provider.provider_name}
              className="w-6 h-6 rounded"
            />
            <span className="text-xs">{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
