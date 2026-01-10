# SlotFlow - Appointment Scheduling System

A modern, intuitive appointment scheduling application built with Next.js 16, React 19, and Tailwind CSS. SlotFlow streamlines the booking process with a beautiful user interface and seamless user experience.

## 🌟 Features

### Core Functionality
- **Multi-step Booking Process**: Guided appointment scheduling with location, date, and time selection
- **Smart Calendar Integration**: Interactive calendar with available time slots
- **Location Management**: Support for multiple clinic/office locations
- **Real-time Availability**: Dynamic time slot availability based on selected date
- **Booking Management**: View, modify, and cancel existing appointments

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Fast Performance**: Built with Next.js 16 and Turbopack for optimal speed

## 🚀 How It Works

### 1. **Hero Section**
- Welcoming landing page with key statistics
- Clear call-to-action buttons for immediate booking
- Trust indicators (locations, experience, patient count)

### 2. **Booking Flow**
```
Step 1: Pick Date → Step 2: Choose Location → Step 3: Pick Time → Step 4: Contact Details → Step 5: Confirmation and Payment
```

### 3. **Location Selection**
- Searchable list of available locations
- Detailed address and operating hours
- Visual selection with confirmation feedback

### 4. **Date & Time Selection**
- Interactive calendar with disabled past dates
- Categorized time slots (Morning, Afternoon, Evening)
- Real-time availability updates

### 5. **Contact Information**
- Secure form with validation
- Required fields clearly marked
- Optional message field for special requests

### 6. **Booking Confirmation**
- Detailed appointment summary
- Email confirmation (configurable)
- Easy cancellation option

## 🛠 Technology Stack

- **Frontend**: Next.js 16.1.1, React 19, TypeScript
- **Styling**: Tailwind CSS 4.1, Custom design system
- **Animations**: Framer Motion (motion/react)
- **UI Components**: Shadcn UI, Lucide Icons
- **Form Handling**: React Hook Form, Zod validation
- **Package Manager**: pnpm

## 📱 Key Features Showcase

### Statistics Display
- **2 Locations**: Multiple service locations
- **7 Days a Week**: Flexible scheduling options
- **1000+ Happy Patients**: Trust and reliability indicator
- **5+ Years Experience**: Professional expertise showcase

### Design Elements
- **Gradient Backgrounds**: Modern visual appeal
- **Micro-interactions**: Hover states and transitions
- **Loading States**: Smooth user feedback
- **Error Handling**: User-friendly error messages

## 🎯 What It Can Do

### For Users
- **Book appointments** in 3 simple steps
- **Choose preferred locations** from available options
- **Select convenient dates and times** from real availability
- **Receive confirmations** via email
- **Cancel or reschedule** appointments easily


## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/theamarverma/slotflow.git

# Navigate to the project
cd slotflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Setup
Create a `.env.local` file with:
```env
# Email configuration (for confirmations)
SMTP_HOST=your-smtp-server
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Application settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📦 Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm type-check # Run TypeScript checks
```

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logo and brand elements in components
- Customize fonts and typography

### Locations
Edit location data in the booking components:

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Made with ❤️ by [theamarverma](https://github.com/theamarverma)**

Built with passion for creating seamless user experiences and modern web applications.

---

**SlotFlow** - Transforming appointment scheduling, one booking at a time. 🚀
