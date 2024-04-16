


export async function test (req,res){
    //req stands for req
    // res stands for response

    try {

        //to get the data passed u use x = req.body;

        //respond by doing res.json({ data : <example would be users>})

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}