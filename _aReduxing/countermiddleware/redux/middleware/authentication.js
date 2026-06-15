

export const authentication = 
    store => 
        next =>
            action => {

                if(store.getState().users.user === true){
                    console.log('user authenticated')
                }

                return next(action);
            }