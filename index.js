const{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js") // it imports all modules from solana web3.js packages

const wallet = new Keypair() // wallet object created
const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey // to see secret key

//console.log(publicKey) // to view public key
//console.log(secretKey) // to view secret 

const getWalletBalance = async() =>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet Balance is ${walletBalance}`) // use Backtick here
    }catch(err){
        console.error(err)
    }
}
const airDropSol = async() =>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey,2*LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    }catch(err){
        console.error(err)
    }
}
const main = async() =>{
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}

main()



