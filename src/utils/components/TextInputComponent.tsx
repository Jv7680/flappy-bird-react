import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

interface TextInputComponentProps {
  label?: string;
  labelShrink?: boolean;
  require?: any;
  error?: any;
  onChange?: any;
  onBlur?: any;
  value: any;
  touched?: any;
  type?: any;
  id?: string;
  rightIcon?: any;
  onRightIcon?: any;
  disabled?: boolean
  isRequire?: boolean
};

export default function TextInputComponent(props: TextInputComponentProps) {
  const {
    value,
    error,
    label,
    labelShrink,
    onBlur,
    onChange,
    require,
    touched,
    id,
    type,
    rightIcon,
    onRightIcon,
    disabled,
    isRequire,
  } = props;
  const classes = useStyles();

  return (
    <>
      <FormControl
        className={classes.textField}
        variant="outlined"
      >
        {
          label &&
          (
            <InputLabel
              htmlFor={id ?? "outlined-input-label"}
              shrink={labelShrink}
              sx={{
                "&.MuiFormLabel-root.Mui-focused": {
                  color: "#523747",
                },
                fontFamily: "VT323",
                fontSize: 20,
                top: -5,
                backgroundColor: "#DBDA96",
              }}
            >
              {label}
              {
                isRequire ?
                  <span style={{ color: "red", marginLeft: 4, marginRight: 4 }}>*</span>
                  :
                  <span style={{ color: "red", marginLeft: 4 }}></span>
              }
            </InputLabel>
          )
        }
        <OutlinedInput
          id={id ?? "outlined-input"}
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={require}
          style={{ height: 50 }}
          endAdornment={
            rightIcon &&
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  onRightIcon && onRightIcon();
                }}
                onMouseDown={() => { }}
                edge="end"
              >
                {rightIcon}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
          label={label + (isRequire ? "*" : "")}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#523747",
            },
            "&.Mui-focused input": {
              color: "#523747"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: disabled ? "rgba(0, 0, 0, 0.26)" : "#523747",
            },
            "& input": {
              fontFamily: "VT323",
              fontSize: 20,
            }
          }}
        />
      </FormControl>

      {
        error && touched ?
          (
            <div className={classes.textErr} dangerouslySetInnerHTML={{ __html: error }}></div>
          )
          :
          (
            <div style={{ visibility: "hidden", margin: 0 }}>No Error</div>
          )
      }
    </>
  );
};

const useStyles = makeStyles({
  textErr: {
    marginTop: 4,
    marginBottom: 14,
    color: "red",
    fontSize: 16,
  },
  textField: {
    marginTop: 20,
    borderColor: "white",
    width: "100%",
    height: 50,
  },
});