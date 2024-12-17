import React from "react"

const ToastProvider = ({ children }) => {
  return <div className="fixed top-0 right-0 z-50 p-4">{children}</div>
}

const Toast = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-2 ${className}`}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={`font-semibold ${className}`} {...props} />
})
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={`mt-1 ${className}`} {...props} />
})
ToastDescription.displayName = "ToastDescription"

export function toast({ title, description }) {
  // Esta es una implementación básica. En una aplicación real,
  // probablemente querrías usar un sistema de gestión de estado
  // para manejar los toasts.
  const toastElement = document.createElement('div')
  toastElement.innerHTML = `
    <div class="fixed top-0 right-0 m-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h3 class="font-semibold">${title}</h3>
      <div class="mt-1">${description}</div>
    </div>
  `
  document.body.appendChild(toastElement)
  setTimeout(() => {
    document.body.removeChild(toastElement)
  }, 3000)
}

export { ToastProvider, Toast, ToastTitle, ToastDescription }

