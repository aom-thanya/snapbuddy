export const buddies = [
  {
    id: 1, name: "จีซู เค.", match: 98, price: 65, rating: 4.9, reviews: 127, style: "Korean Soft", available: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 2, name: "มินโฮ แอล.", match: 91, price: 55, rating: 4.8, reviews: 89, style: "Natural Light", available: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 3, name: "โซรา พี.", match: 85, price: 45, rating: 4.7, reviews: 64, style: "Vintage Film", available: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

export const initialBookings = [
  {
    id: 1, title: "เช้าคาเฟ่สไตล์เกาหลีนุ่มๆ", location: "Mellow Grounds · อิแทวอน", date: "พรุ่งนี้ 08:30 น.",
    photographer: "จีซู เค.", status: "กำลังจะถึง", statusTone: "amber", total: "฿95",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80"
    ],
    review: null
  },
  {
    id: 2, title: "ยามเย็นบนดาดฟ้า", location: "Sky Terrace · กังนัม", date: "12 เม.ย. 17:30 น.",
    photographer: "มินโฮ แอล.", status: "ได้รับภาพแล้ว", statusTone: "green", total: "฿120",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80"
    ],
    review: null
  },
  {
    id: 3, title: "มุมหนังสือวันฝนตก", location: "Chapters & Co · ฮงแด", date: "2 เม.ย. 14:00 น.",
    photographer: "โซรา พี.", status: "เสร็จสิ้น", statusTone: "stone", total: "฿85",
    gallery: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
    ],
    review: { rating: 5, vibeMatch: 4, comment: "บรรยากาศดีมาก ตรงกับที่จินตนาการไว้เลย ช่างภาพใจดีมาก แนะนำเลย!", issues: [] }
  }
];

export const issueOptions = ["ช่างภาพมาสาย", "ภาพไม่ตรง vibe", "สถานที่ไม่ตรง", "คุณภาพภาพต่ำกว่าที่คาด", "การสื่อสารไม่ดี"];
