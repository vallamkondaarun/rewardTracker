export const calculateReward = (amount) => {
    return (amount > 100) ? (((amount - 100) * 2) + 50) : (( amount> 50 && (amount - 50)) * 1)
}