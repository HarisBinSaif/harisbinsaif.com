import { useEffect, useRef } from 'react'

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0, 
    active: false 
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Create nodes for the animation - more nodes for full background
    const nodeCount = 100
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (canvas.width || window.innerWidth),
      y: Math.random() * (canvas.height || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1.5,
      baseRadius: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }))

    // Mouse tracking - ensure it works
    const handleMouseMove = (e) => {
      if (mouseRef.current) {
        mouseRef.current.x = e.clientX
        mouseRef.current.y = e.clientY
        mouseRef.current.active = true
      }
    }

    const handleMouseEnter = () => {
      if (mouseRef.current) {
        mouseRef.current.active = true
      }
    }

    const handleMouseLeave = () => {
      if (mouseRef.current) {
        mouseRef.current.active = false
      }
    }

    // Add listeners - use capture phase for better tracking
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    let animationFrameId
    let lastTime = performance.now()
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      // Clear with fade effect for trails
      ctx.fillStyle = 'rgba(5, 8, 18, 0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const mouseRadius = 200

      nodes.forEach((node, i) => {
        // Calculate distance from mouse
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Mouse interaction - STRONG reaction to cursor
        if (mouse.active && distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          const angle = Math.atan2(dy, dx)
          
          // Strong repel effect - nodes move away from cursor
          const repelForce = force * 0.15
          node.vx -= Math.cos(angle) * repelForce
          node.vy -= Math.sin(angle) * repelForce
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary collision with damping
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.8
          node.x = Math.max(0, Math.min(canvas.width, node.x))
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.8
          node.y = Math.max(0, Math.min(canvas.height, node.y))
        }

        // Velocity damping for smooth movement
        node.vx *= 0.98
        node.vy *= 0.98

        // Pulse effect
        node.pulse += 0.02
        node.radius = node.baseRadius + Math.sin(node.pulse) * 0.5

        // Draw node with glow - more visible
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 5
        )
        gradient.addColorStop(0, 'rgba(0, 212, 255, 1)')
        gradient.addColorStop(0.3, 'rgba(0, 212, 255, 0.6)')
        gradient.addColorStop(0.7, 'rgba(0, 212, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw node core
        ctx.fillStyle = 'rgba(0, 212, 255, 1)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby nodes
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 130) {
            const opacity = (1 - distance / 130) * 0.5
            
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        })

        // Draw connection to mouse if close - VISIBLE following effect
        if (mouse.active) {
          const mouseDx = mouse.x - node.x
          const mouseDy = mouse.y - node.y
          const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

          if (mouseDistance < 220) {
            const opacity = (1 - mouseDistance / 220) * 0.8
            
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      })

      // Draw mouse cursor effect - VERY VISIBLE
      if (mouse.active) {
        const time = Date.now() * 0.001
        const pulseSize = 80 + Math.sin(time * 3) * 30
        
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, pulseSize
        )
        mouseGradient.addColorStop(0, 'rgba(0, 212, 255, 0.6)')
        mouseGradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.4)')
        mouseGradient.addColorStop(0.6, 'rgba(236, 72, 153, 0.2)')
        mouseGradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
        
        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Outer ring - bright
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.7 + Math.sin(time * 2) * 0.3})`
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, pulseSize, 0, Math.PI * 2)
        ctx.stroke()
        
        // Inner bright dot at cursor
        ctx.fillStyle = 'rgba(0, 212, 255, 1)'
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, []) // Empty dependency array - only run once

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ 
        width: '100vw',
        height: '100vh',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  )
}

export default InteractiveBackground
