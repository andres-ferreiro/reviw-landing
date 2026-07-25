import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center py-3">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 shrink-0 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
