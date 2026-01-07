"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

function RadialOrbitalTimelineComponent({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const animationFrameRef = useRef<number>();
  const { theme } = useTheme();


  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const animateRotation = useCallback(() => {
    setRotationAngle(prev => (prev + 0.1) % 360);
    animationFrameRef.current = requestAnimationFrame(animateRotation);
  }, []);

  useEffect(() => {
    if (autoRotate && viewMode === 'orbital') {
      animationFrameRef.current = requestAnimationFrame(animateRotation);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate, viewMode, animateRotation]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 150; // Reduced radius for smaller screens
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
        case "completed": return "text-black bg-accent border-accent";
        case "in-progress": return "text-primary bg-primary-foreground border-primary-foreground";
        case "pending": return "text-muted-foreground bg-muted/20 border-muted/50";
        default: return "text-muted-foreground bg-muted/20 border-muted/50";
    }
  };
  
  const getCardClasses = () => 'bg-background/90 backdrop-blur-lg border-border shadow-xl shadow-foreground/10';

  const getTextColor = (type: 'default' | 'muted' | 'title') => {
      switch(type) {
          case 'title': return 'text-foreground';
          case 'muted': return 'text-muted-foreground';
          default: return 'text-foreground/80';
      }
  }

  const getNodeClasses = (isExpanded: boolean, isRelated: boolean) => {
    let classes = 'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform';
    if(isExpanded) {
        classes += ' bg-foreground text-background border-foreground shadow-lg shadow-foreground/30 scale-150';
    } else if (isRelated) {
        classes += ' bg-foreground/50 text-background border-foreground animate-pulse';
    } else {
        classes += ' bg-background text-foreground border-foreground/40';
    }
    return classes;
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-accent via-primary to-secondary animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-border animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-border animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[300px] h-[300px] rounded-full border border-border"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, hsl(var(--accent)/0.2) 0%, hsl(var(--accent)/0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={getNodeClasses(isExpanded, isRelated)}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-foreground scale-125" : "text-muted-foreground"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className={`absolute top-20 left-1/2 -translate-x-1/2 w-64 overflow-visible ${getCardClasses()}`}>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "Concluído"
                            : item.status === "in-progress"
                            ? "Em progresso"
                            : "Pendente"}
                        </Badge>
                        <span className={`text-xs font-mono ${getTextColor('muted')}`}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className={`text-sm mt-2 ${getTextColor('title')}`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-xs ${getTextColor('default')}`}>
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Nível de Energia
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link size={10} className={`${getTextColor('muted')} mr-1`} />
                            <h4 className={`text-xs uppercase tracking-wider font-medium ${getTextColor('muted')}`}>
                              Nós Conectados
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2 py-0 text-xs rounded-none border-border bg-transparent hover:bg-accent/20 ${getTextColor('default')} hover:text-accent-foreground transition-all`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-muted-foreground"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function RadialOrbitalTimeline(props: RadialOrbitalTimelineProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <RadialOrbitalTimelineComponent {...props} />;
}
