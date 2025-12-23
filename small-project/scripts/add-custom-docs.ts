import 'dotenv/config'
import { createDocument } from '../database/index'

/**
 * Script mẫu để thêm tài liệu tùy chỉnh
 * 
 * Cách sử dụng:
 * 1. Sửa nội dung trong mảng customDocuments
 * 2. Chạy: npx tsx scripts/add-custom-docs.ts
 * 3. Chạy: npm run db:embed (để tạo embeddings)
 */

const customDocuments = [
  {
    title: 'Ví dụ: Hướng dẫn sử dụng React Hooks',
    slug: 'vi-du-react-hooks',
    content: `React Hooks là một tính năng được thêm vào React 16.8 cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class component.

Các Hook phổ biến:

1. useState: Quản lý state trong functional component
const [count, setCount] = useState(0);

2. useEffect: Xử lý side effects (API calls, subscriptions, etc.)
useEffect(() => {
  document.title = 'Đã click ' + count + ' lần';
}, [count]);

3. useContext: Truy cập Context API
const theme = useContext(ThemeContext);

4. useRef: Tham chiếu đến DOM elements
const inputRef = useRef(null);

Quy tắc khi dùng Hooks:
- Chỉ gọi Hooks ở top level (không trong loops, conditions)
- Chỉ gọi Hooks trong React functions
- Custom Hooks phải bắt đầu bằng "use"

Hooks giúp code dễ đọc, dễ test và tái sử dụng logic giữa các components.`,
  },
  // Thêm documents khác vào đây
  // {
  //   title: 'Tài liệu của bạn',
  //   slug: 'tai-lieu-cua-ban',
  //   content: `Nội dung chi tiết...`
  // }
]

async function addCustomDocuments() {
  console.log('📝 Adding custom documents...\n')

  try {
    for (const doc of customDocuments) {
      console.log(`   Creating: ${doc.title}`)
      await createDocument(doc)
      console.log(`   ✅ Created: ${doc.title}\n`)
    }

    console.log(`🎉 Successfully added ${customDocuments.length} document(s)!`)
    console.log('\n📝 Next step:')
    console.log('   Run: npm run db:embed    (to generate embeddings)\n')
    
  } catch (error: any) {
    if (error.code === '23505') {
      console.error('❌ Error: Document with this slug already exists.')
      console.error('   Change the slug to a unique value.\n')
    } else {
      console.error('❌ Error adding documents:', error)
    }
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

addCustomDocuments()
