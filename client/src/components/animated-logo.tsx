interface AnimatedLogoProps {
  size?: number;
  showRays?: boolean;
  className?: string;
}

export default function AnimatedLogo({ size = 48, showRays = false, className = "" }: AnimatedLogoProps) {
  const viewBox = showRays ? "0 0 200 200" : "0 0 120 120";
  const centerX = showRays ? 100 : 60;
  const centerY = showRays ? 100 : 60;
  const coreRadius = showRays ? 20 : 12;
  const outerRadius = showRays ? 8 : 6;
  const networkRadius = showRays ? 80 : 48;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={viewBox} 
      className={`animate-pulse-slow ${className}`}
    >
      {showRays && (
        <g className="animate-spin-slow origin-center">
          <line x1={centerX} y1="10" x2={centerX} y2="30" stroke="#fbbf24" strokeWidth="4" opacity="0.8"/>
          <line x1="141" y1="25" x2="132" y2="40" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="175" y1="59" x2="160" y2="68" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="190" y1={centerY} x2="170" y2={centerY} stroke="#fbbf24" strokeWidth="4" opacity="0.8"/>
          <line x1="175" y1="141" x2="160" y2="132" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="141" y1="175" x2="132" y2="160" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1={centerX} y1="190" x2={centerX} y2="170" stroke="#fbbf24" strokeWidth="4" opacity="0.8"/>
          <line x1="59" y1="175" x2="68" y2="160" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="25" y1="141" x2="40" y2="132" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="10" y1={centerY} x2="30" y2={centerY} stroke="#fbbf24" strokeWidth="4" opacity="0.8"/>
          <line x1="25" y1="59" x2="40" y2="68" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
          <line x1="59" y1="25" x2="68" y2="40" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
        </g>
      )}
      
      {/* Neural Network */}
      <circle cx={centerX} cy={centerY} r={networkRadius} fill="none" stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.5" : "0.4"}/>
      
      {/* Central Sun Core */}
      <circle cx={centerX} cy={centerY} r={coreRadius} fill="url(#sunGradient)" className="animate-glow"/>
      
      {/* Outer Neural Nodes */}
      <circle cx={centerX} cy={centerY - (showRays ? 50 : 25)} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX + (showRays ? 35 : 21)} cy={centerY - (showRays ? 35 : 15)} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX + (showRays ? 50 : 29)} cy={centerY} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX + (showRays ? 35 : 21)} cy={centerY + (showRays ? 35 : 15)} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX} cy={centerY + (showRays ? 50 : 25)} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX - (showRays ? 35 : 21)} cy={centerY + (showRays ? 35 : 15)} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX - (showRays ? 50 : 29)} cy={centerY} r={outerRadius} fill="#8b5cf6"/>
      <circle cx={centerX - (showRays ? 35 : 21)} cy={centerY - (showRays ? 35 : 15)} r={outerRadius} fill="#8b5cf6"/>
      
      {/* Neural Connections */}
      <line x1={centerX} y1={centerY - (showRays ? 20 : 12)} x2={centerX} y2={centerY - (showRays ? 50 : 25)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX + (showRays ? 15 : 9)} y1={centerY - (showRays ? 15 : 9)} x2={centerX + (showRays ? 35 : 21)} y2={centerY - (showRays ? 35 : 15)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX + (showRays ? 20 : 12)} y1={centerY} x2={centerX + (showRays ? 50 : 29)} y2={centerY} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX + (showRays ? 15 : 9)} y1={centerY + (showRays ? 15 : 9)} x2={centerX + (showRays ? 35 : 21)} y2={centerY + (showRays ? 35 : 15)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX} y1={centerY + (showRays ? 20 : 12)} x2={centerX} y2={centerY + (showRays ? 50 : 25)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX - (showRays ? 15 : 9)} y1={centerY + (showRays ? 15 : 9)} x2={centerX - (showRays ? 35 : 21)} y2={centerY + (showRays ? 35 : 15)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX - (showRays ? 20 : 12)} y1={centerY} x2={centerX - (showRays ? 50 : 29)} y2={centerY} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      <line x1={centerX - (showRays ? 15 : 9)} y1={centerY - (showRays ? 15 : 9)} x2={centerX - (showRays ? 35 : 21)} y2={centerY - (showRays ? 35 : 15)} stroke="#8b5cf6" strokeWidth={showRays ? "3" : "2"} opacity={showRays ? "0.9" : "0.8"}/>
      
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
          <stop offset="30%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
          <stop offset="70%" style={{stopColor: '#8b5cf6', stopOpacity: 0.9}} />
          <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 0.8}} />
        </radialGradient>
      </defs>
    </svg>
  );
}
