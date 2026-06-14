import { Compass, ImageIcon } from 'lucide-react'

export function PanoramaPlaceholder({ stopName }) {
  return (
    <div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-100 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <Compass className="h-7 w-7 text-[#1a2b5a]" />
      </div>
      <p className="text-sm font-semibold text-[#1a2b5a]">360° tour not added yet</p>
      <p className="mt-1 max-w-sm px-4 text-xs text-slate-500">
        {stopName
          ? `Add a panorama config to "${stopName}" in your tour data.`
          : 'Select a tour stop or add panorama data to get started.'}
      </p>
      <code className="mt-4 block max-w-md rounded-md bg-white px-3 py-2 text-left text-[11px] text-slate-600">
        panorama: {'{ type: "equirectangular", src: "/panoramas/..." }'}
      </code>
    </div>
  )
}

export function PanoramaLoading() {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-slate-900 text-sm text-slate-300">
      <ImageIcon className="mr-2 h-4 w-4 animate-pulse" />
      Loading 360° view…
    </div>
  )
}
