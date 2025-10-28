import { motion } from 'motion/react';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProcessingScreenProps {
  onSkip: () => void;
}

export function ProcessingScreen({ onSkip }: ProcessingScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white px-6 py-8">
      {/* Receipt Preview */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[280px] mb-8"
        >
          <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* Simulated receipt image */}
            <div className="absolute inset-0 p-6 text-gray-600 opacity-40 font-mono">
              <div className="text-center mb-4">
                ════════════════
              </div>
              <div className="space-y-2">
                <div>COFFEE SHOP</div>
                <div className="h-px bg-gray-400 my-2" />
                <div>Cappuccino.....$5.00</div>
                <div>Croissant......$2.50</div>
                <div className="h-px bg-gray-400 my-2" />
                <div>Total.........$7.50</div>
              </div>
            </div>
            {/* Scanning overlay */}
            <motion.div
              className="absolute inset-x-0 h-1 bg-teal-500 shadow-lg shadow-teal-500/50"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>

        {/* Processing Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
        >
          <p className="text-gray-900 mb-2">Analyzing your receipt...</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full max-w-[280px] mb-8">
          <Progress value={66} className="h-2" />
        </div>

        {/* Item Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-[280px]"
        >
          <Card className="p-5 bg-gray-50 border-2 border-teal-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-900">$7.50</span>
              <span className="text-gray-600">Coffee</span>
            </div>
            <Button variant="outline" className="w-full" onClick={onSkip}>
              Edit
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Processing Animation Dots */}
      <div className="flex justify-center gap-2 pb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-teal-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}