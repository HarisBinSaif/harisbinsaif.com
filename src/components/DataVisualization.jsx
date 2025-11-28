import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const DataVisualization = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const container = canvas.parentElement
    const updateCanvasSize = () => {
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 2,
    }))

    let animationFrameId
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#00d4ff'
        ctx.fill()

        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-2xl glass"
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <div className="w-32 h-32 rounded-full border-2 border-data-accent/30" />
      </motion.div>
    </div>
  )
}

export default DataVisualization

