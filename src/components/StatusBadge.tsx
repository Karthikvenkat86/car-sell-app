import { Clock, Eye, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatusType = 'pending' | 'inspected' | 'approved' | 'rejected' | 'completed'

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          label: 'Pending'
        }
      case 'inspected':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: Eye,
          label: 'Inspected'
        }
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Approved'
        }
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          label: 'Rejected'
        }
      case 'completed':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: DollarSign,
          label: 'Completed'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          label: 'Unknown'
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config.color,
      className
    )}>
      <Icon className="h-4 w-4 mr-1" />
      {config.label}
    </span>
  )
}
