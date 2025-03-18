import { useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { calculateExpirationDate, cn, delay, formatDateFn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
// import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  complianceTypeList,
  departmentList,
  frequencyList,
} from "@/lib/constant";
import { useUpdateRequirement } from "@/hooks/requirements";
import { format as formatDate } from "date-fns";
import { Requirement } from "@/lib/types";
import { useNavigate } from "react-router";
import { DatetimePicker } from "@/components/ui/datetime-picker";

const formSchema = z.object({
  entity: z.string().min(1),
  complianceList: z.string().min(1, {
    message: "Please enter a compliance list.",
  }),
  frequencyOfCompliance: z.string().min(1, {
    message: "Please select a frequency of compliance.",
  }),
  typeOfCompliance: z.string().min(1, {
    message: "Please select a type of compliance.",
  }),
  dateSubmitted: z.coerce.date(),
  expiration: z.coerce.date(),
  personInCharge: z.string().min(1),
  department: z.string().min(1, {
    message: "Please select a department.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
});

type Props = {
  requirement: Requirement;
};

export const UpdateRequirementForm = ({ requirement }: Props) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { mutate: updateRequirement } = useUpdateRequirement(requirement.$id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateSubmitted: new Date(requirement.dateSubmitted),
      entity: requirement.entity,
      complianceList: requirement.complianceList,
      frequencyOfCompliance: requirement.frequencyOfCompliance,
      typeOfCompliance: requirement.typeOfCompliance,
      personInCharge: requirement.personInCharge,
      department: requirement.department,
      expiration: new Date(requirement.expiration),
      status: requirement.status,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { dateSubmitted, ...data } = values;
    const expiration = calculateExpirationDate(
      dateSubmitted,
      values.frequencyOfCompliance
    );
    startTransition(async () => {
      try {
        updateRequirement({
          ...data,
          dateSubmitted: formatDate(dateSubmitted, "yyyy-MM-dd"),
          expiration: formatDate(expiration, "yyyy-MM-dd"),
          onProcessedDate: requirement.onProcessedDate,
        });
        await delay();
        toast.success("Requirement Document updated successfully.");
        navigate(`/dashboard/requirements/${requirement.$id}`, {
          replace: true,
        });
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 py-5 grid md:grid-cols-2 gap-5"
      >
        <FormField
          control={form.control}
          name="entity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regulatory Bodies / Entity</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter the entity name..."
                  type="text"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complianceList"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>List of Compliance / Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="list the compliance or requirements needed..."
                  className="resize-none"
                  {...field}
                  rows={7}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frequencyOfCompliance"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Frequency of Compliance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value
                        ? frequencyList.find(
                            (dept) => dept.value === field.value
                          )?.label
                        : "Select frequency"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search compliance..." />
                    <CommandList>
                      <CommandEmpty>No compliance found.</CommandEmpty>
                      <CommandGroup>
                        {frequencyList.map((freq) => (
                          <CommandItem
                            value={freq.label}
                            key={freq.value}
                            onSelect={() => {
                              form.setValue(
                                "frequencyOfCompliance",
                                freq.value
                              );
                            }}
                            disabled={isPending}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                freq.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {freq.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeOfCompliance"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Type of Compliance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value
                        ? complianceTypeList.find(
                            (dept) => dept.value === field.value
                          )?.label
                        : "Select type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search department..." />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {complianceTypeList.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("typeOfCompliance", type.value);
                            }}
                            disabled={isPending}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="dateSubmitted"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Submitted / Conducted</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="dateSubmitted"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Submitted / Conducted</FormLabel>
              <DatetimePicker
                {...field}
                format={[["months", "days", "years"]]}
              />
              <FormDescription>Month / Day / Year</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-1">
          <p className="text-sm">Expiration Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal bg-neutral-300"
                  )}
                  disabled
                >
                  <span>
                    {formatDateFn(
                      calculateExpirationDate(
                        form.watch("dateSubmitted"),
                        form.watch("frequencyOfCompliance")
                      )
                    )}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <FormField
          control={form.control}
          name="personInCharge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Person in-charge for renewal</FormLabel>
              <FormControl>
                <Input
                  placeholder="type the person in charge for renewal..."
                  type=""
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Department</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending}
                    >
                      {field.value
                        ? departmentList.find(
                            (department) => department.value === field.value
                          )?.label
                        : "Select department"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search department..." />
                    <CommandList>
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {departmentList.map((department) => (
                          <CommandItem
                            value={department.label}
                            key={department.value}
                            onSelect={() => {
                              form.setValue("department", department.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                department.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {department.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="space-y-1 grid grid-cols-2"
                >
                  {[
                    ["Active", "Active"],
                    ["Inactive", "Inactive"],
                    ["On Process", "On Process"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={option[1]}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="col-span-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
