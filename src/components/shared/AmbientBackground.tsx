import { motion } from 'framer-motion'

const orbs = [
  {
    color: 'rgba(45, 212, 191, 0.08)',
    size: 300,
    initialX: -50,
    initialY: -30,
    animateX: ['-50px', '80px', '-20px', '-50px'],
    animateY: ['-30px', '60px', '-10px', '-30px'],
    duration: 18,
  },
  {
    color: 'rgba(244, 201, 93, 0.06)',
    size: 250,
    initialX: 200,
    initialY: 400,
    animateX: ['200px', '120px', '220px', '200px'],
    animateY: ['400px', '320px', '450px', '400px'],
    duration: 20,
  },
  {
    color: 'rgba(139, 92, 246, 0.06)',
    size: 280,
    initialX: 100,
    initialY: 200,
    animateX: ['100px', '180px', '50px', '100px'],
    animateY: ['200px', '280px', '150px', '200px'],
    duration: 16,
  },
  {
    color: 'rgba(45, 212, 191, 0.05)',
    size: 200,
    initialX: 250,
    initialY: 100,
    animateX: ['250px', '180px', '280px', '250px'],
    animateY: ['100px', '180px', '60px', '100px'],
    duration: 22,
  },
]

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: 'blur(80px)',
          }}
          animate={{
            x: orb.animateX,
            y: orb.animateY,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
