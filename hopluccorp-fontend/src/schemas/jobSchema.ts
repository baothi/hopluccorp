// src/schemas/jobSchema.ts
import { z } from "zod";

// Định nghĩa SelectOption type trước để tái sử dụng
const SelectOption = z.object({
  value: z.string(),
  label: z.string(),
});

// Định nghĩa SelectOptionNullable riêng để có thể validation runtime
// const SelectOptionRequired = SelectOption.nullable().superRefine((val, ctx) => {
//   if (val === null) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "This field is required",
//     });
//   }
// });

// Schema cho form
export const jobSchema = z.object({
    jobTitle: z.string().min(1, { message: "Tên công việc là bắt buộc" }),
    companyName: z.string().min(1, { message: "Tên công ty là bắt buộc" }),
    companyId: z.string().min(1, { message: "Vui lòng chọn công ty" }),
    quantity: z.string().min(1, { message: "Số lượng tuyển là bắt buộc" }),

    level: SelectOption.nullable(),

    // Sử dụng nullable() cho các field required nhưng có thể null trong quá trình nhập
    mainCategory: SelectOption.nullable(),
    subCategory: SelectOption.nullable(),

    skills: z.array(SelectOption).min(1, { message: "Vui lòng chọn ít nhất một kỹ năng" }),
    additional_Skills: z.string().optional(),
    workType: SelectOption.nullable(),
    gender: SelectOption.nullable(),
    startDate: z.string().min(1, { message: "Ngày bắt đầu là bắt buộc" }),
    endDate: z.string().min(1, { message: "Ngày kết thúc là bắt buộc" }),

    city: SelectOption.nullable(),
    district: SelectOption.nullable(),

    specificAddress: z.string().optional(),
    salaryNegotiable: z.boolean().default(false),
    salaryMin: z.string().optional(),
    salaryMax: z.string().optional(),
    salaryCurrency: SelectOption.nullable(),
    experience: SelectOption.nullable(),
    qualifications: z.array(SelectOption).optional().default([]),
})
// Thêm validation ở level form thay vì field level
.superRefine((data, ctx) => {
  // Validate mainCategory
  if (!data.mainCategory) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Danh mục chính là bắt buộc",
      path: ["mainCategory"],
    });
  }

  // Validate subCategory
  if (!data.subCategory) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Danh mục phụ là bắt buộc",
      path: ["subCategory"],
    });
  }

  // Validate city
  if (!data.city) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Thành phố là bắt buộc",
      path: ["city"],
    });
  }

  // Validate district
  if (!data.district) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Quận/Huyện là bắt buộc",
      path: ["district"],
    });
  }
});

// Loại dữ liệu suy ra từ schema
export type JobFormValues = z.infer<typeof jobSchema>;

// Giá trị ban đầu - giờ đây sẽ work với null values
export const initialJobValues: JobFormValues = {
  jobTitle: "",
  companyName: "",
  companyId: "",
  quantity: "",
  level: null,
  mainCategory: null,
  subCategory: null,
  skills: [],
  additional_Skills: "",
  workType: null,
  gender: null,
  startDate: "",
  endDate: "",
  city: null,
  district: null,
  specificAddress: "",
  salaryNegotiable: false,
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: null,
  experience: null,
  qualifications: [],
};
