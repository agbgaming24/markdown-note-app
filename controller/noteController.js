import pool from '../model/db.js'
import { marked} from 'marked'
import WriteGood from 'write-good'

export const checkGrammar=(req,res)=>{
    try{
        const{content}=req.body;
        if(!content){
            return res.status(400).json({message:"No content found"})
        }
        const suggestions=WriteGood(content);
        res.status(200).json({ issues })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const saveNote=async(req,res)=>{
    try{
        const{title,content}=req.body;
        if(!title || !content){
            return res.status(404).json({message:'content incomplete'})
        }
        const[result]=await pool.execute('insert into notes(title,content) values (?, ?)',[title,content])
        res.status(201).json({
            id:result.insertId,
            title,
            message:'Note inserted successfully'
            }
        )
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const getNote=async(req,res)=>{
    try {
    const [rows] = await pool.execute(
      'SELECT id, title, created_at FROM notes'
    )
    res.status(200).json({ notes: rows })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const renderNote=async(req,res)=>{
    try {
        const id = parseInt(req.params.id)

        if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid note id" })
        }
        const [rows] = await pool.execute(
        'SELECT * FROM notes WHERE id = ?',
        [id]
        )

        if (rows.length === 0)
        return res.status(404).json({ message: 'Note not found' })

        const html = marked(rows[0].content)

        res.status(200).json({
        id: rows[0].id,
        title: rows[0].title,
        html
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const uploadNote = async (req, res) => {

  try {
    const content = req.file.buffer.toString('utf-8')
    const title = req.file.originalname.replace('.md', '')

    const issues = WriteGood(content)

    const html = marked(content)

    res.status(200).json({ title, content, html, issues })

  } catch (err) {
    res.status(500).json({ message: err.message })

  }

}