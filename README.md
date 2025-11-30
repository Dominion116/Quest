# Quest 🌍

A decentralized geography quiz platform built on the Celo blockchain. Test your knowledge, track your progress on-chain, and prove your expertise with immutable blockchain records.

![Quest](https://img.shields.io/badge/blockchain-Celo-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

- **🔐 Blockchain Verified**: All answers recorded on the Celo blockchain for immutable proof
- **📊 Progress Tracking**: Monitor your quiz completion rate and improvement over time
- **🌐 IPFS Integration**: Questions stored on IPFS for decentralized content delivery
- **✏️ Edit Functionality**: Update your answers even after submission
- **🎨 Modern UI**: Clean, responsive design with smooth animations
- **📱 Mobile First**: Fully responsive interface that works on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: 
  - Celo Network
  - Wagmi v2 for Ethereum interactions
  - Reown AppKit (WalletConnect) for wallet connections
  - Viem for TypeScript Ethereum tooling
- **Storage**: IPFS for decentralized question storage
- **State Management**: TanStack React Query

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or higher
- npm or yarn package manager
- A Web3 wallet (MetaMask, WalletConnect compatible, etc.)
- A Reown Cloud project ID ([Get one here](https://cloud.reown.com))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dominion116/Quest.git
   cd Quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Connect Your Wallet**: Click "Get Started" on the landing page and connect your Web3 wallet
2. **Answer Questions**: Navigate through geography questions one by one
3. **Submit Answers**: Your answers are recorded on the Celo blockchain
4. **Track Progress**: View your completion stats and progress percentage
5. **Edit Answers**: Click "Edit" on completed questions to update your submissions

## 📁 Project Structure

```
Quest/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and animations
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Main application page
│   ├── components/
│   │   ├── LandingPage.tsx      # Landing page component
│   │   ├── ConnectWallet.tsx    # Wallet connection UI
│   │   ├── QuestionCard.tsx     # Question display component
│   │   ├── OwnerPanel.tsx       # Admin panel for owners
│   │   └── Toast.tsx            # Notification component
│   ├── hooks/
│   │   └── useContract.ts       # Smart contract hooks
│   └── lib/
│       ├── wagmi.tsx            # Wagmi and AppKit configuration
│       └── contract.ts          # Contract ABI and address
├── public/                      # Static assets
├── .env.local                   # Environment variables (create this)
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🔧 Smart Contract

The quiz uses a smart contract deployed on Celo:
- **Address**: `0xaDAbd6fd6f98Fe742bb95220eb196B3d5A9A2f96`
- **Network**: Celo Mainnet

### Contract Functions:
- `submitAnswer(questionId, answer)`: Submit an answer to a question
- `getSubmission(address, questionId)`: Get a user's submission
- `setCID(newCID)`: Update the IPFS CID for questions (owner only)

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: '#8B5CF6',        // Purple
  'primary-hover': '#7C3AED',
  accent: '#A78BFA',
  background: '#0a0a0a',     // Dark background
  surface: '#1a1a1a',
}
```

### Animations
Custom animations are defined in `src/app/globals.css`:
- `fade-in`: Smooth opacity transition
- `slide-up`: Upward motion with fade
- `scale-in`: Zoom effect
- `float`: Floating animation for decorative elements

## 📦 Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🔑 Owner Features

If you're the contract owner, you'll see an additional panel to:
- Update the IPFS CID for questions
- Manage quiz content through decentralized storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Celo Documentation](https://docs.celo.org)
- [Reown AppKit](https://docs.reown.com)
- [Wagmi Documentation](https://wagmi.sh)
- [Next.js Documentation](https://nextjs.org/docs)

## 💡 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation links above

---

**Built with ❤️ on the Celo blockchain**
