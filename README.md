# Sournal

This is simple project to save note in a journal. This dApp performs CRUD operation in Solana.

Program is deployed in devnet : [HERE]("https://explorer.solana.com/address/8Px6wxLmE9rjLAP3wbueCaocfRf2CrsdCmNmGJthdZ1p?cluster=devnet")

> [!NOTE]
> Program is deployed in devnet. Fill you wallet with some sol to interact with the dApp

## Screenshots
![ss1](/assets/s1.png)
![ss2](/assets/s2.png)
![ss3](/assets/s3.png)

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.1 or higher
- Solana CLI 1.18.17 or higher

### Installation

#### Clone the repo

```shell
git clone https://github.com/4rjunc/SOURNAL.git
cd SOURNAL
```

#### Install Dependencies

```shell
yarn install
```

#### Start the web app

```
yarn run dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `yarn run`, eg: `yarn run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
yarn run anchor keys sync
```

#### Build the program:

```shell
yarn run anchor-build
```

#### Start the test validator with the program deployed:

```shell
yarn run anchor-localnet
```

#### Run the tests

```shell
yarn run anchor-test
```

#### Deploy to Devnet

```shell
yarn run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
yarn run dev
```

Build the web app

```shell
yarn run build
```
