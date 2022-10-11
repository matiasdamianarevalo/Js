const homeControllers = async () => {
    try{
        const response = await fetch ('src/stock.json');
        const data = await response.json();
        
        return data;
    }catch(error){
        console.log('hubo un error', error);
    }
};


export { homeControllers }