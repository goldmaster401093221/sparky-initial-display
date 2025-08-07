import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SignupStep3Props {
  formData: {
    experienceYears: string;
    primaryResearchArea: string;
    secondaryResearchArea: string;
    keywords: string[];
    researchRoles: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
  onFinish: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const SignupStep3: React.FC<SignupStep3Props> = ({ formData, onChange, onFinish, onCancel, loading }) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');
  const [customPrimaryArea, setCustomPrimaryArea] = useState('');
  const [customSecondaryArea, setCustomSecondaryArea] = useState('');

  const experienceOptions = [
    { value: '<5', label: 'Less than 5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10-20', label: '10-20 years' },
    { value: '>20', label: 'More than 20 years' }
  ];

  const researchAreaOptions = [
    'Biomedical Sciences',
    'Computer Science',
    'Engineering',
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'Environmental Science',
    'Psychology',
    'Medicine',
    'Other'
  ];

  const keywordOptions = [
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Biotechnology',
    'Nanotechnology',
    'Molecular Biology',
    'Genetics',
    'Robotics',
    'Quantum Computing',
    'Climate Change',
    'Other'
  ];

  const roleOptions = [
    'Principal Investigator',
    'Co-Principal Investigator',
    'Co-Investigator',
    'Research Associate',
    'Research Assistant',
    'Graduate Researcher',
    'Postdoc',
    'Research Technician',
    'Undergraduate Researcher'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish();
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      onChange('keywords', [...formData.keywords, keyword]);
    }
    setSelectedKeyword('');
    setCustomKeyword('');
  };

  const removeKeyword = (keyword: string) => {
    onChange('keywords', formData.keywords.filter(k => k !== keyword));
  };

  const addRole = (role: string) => {
    if (role && !formData.researchRoles.includes(role)) {
      onChange('researchRoles', [...formData.researchRoles, role]);
    }
    setSelectedRole('');
  };

  const removeRole = (role: string) => {
    onChange('researchRoles', formData.researchRoles.filter(r => r !== role));
  };

  const handlePrimaryAreaChange = (value: string) => {
    if (value === 'Other') {
      onChange('primaryResearchArea', customPrimaryArea);
    } else {
      onChange('primaryResearchArea', value);
      setCustomPrimaryArea('');
    }
  };

  const handleSecondaryAreaChange = (value: string) => {
    if (value === 'Other') {
      onChange('secondaryResearchArea', customSecondaryArea);
    } else {
      onChange('secondaryResearchArea', value);
      setCustomSecondaryArea('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Tell us more about you<br />
          to help you finding collaborators
        </h2>
        <p className="text-lg text-muted-foreground">Research Interest</p>
      </div>

      <Progress value={100} className="w-full" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="experienceYears">Research Experience in Years (Mandatory)</Label>
          <Select value={formData.experienceYears} onValueChange={(value) => onChange('experienceYears', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select experience range" />
            </SelectTrigger>
            <SelectContent>
              {experienceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryResearchArea">Primary Research Area (Mandatory)</Label>
          <Select value={formData.primaryResearchArea} onValueChange={handlePrimaryAreaChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select primary research area" />
            </SelectTrigger>
            <SelectContent>
              {researchAreaOptions.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.primaryResearchArea === 'Other' && (
            <Input
              placeholder="Enter custom primary research area"
              value={customPrimaryArea}
              onChange={(e) => {
                setCustomPrimaryArea(e.target.value);
                onChange('primaryResearchArea', e.target.value);
              }}
              required
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryResearchArea">Secondary Research Area (Mandatory)</Label>
          <Select value={formData.secondaryResearchArea} onValueChange={handleSecondaryAreaChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select secondary research area" />
            </SelectTrigger>
            <SelectContent>
              {researchAreaOptions.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.secondaryResearchArea === 'Other' && (
            <Input
              placeholder="Enter custom secondary research area"
              value={customSecondaryArea}
              onChange={(e) => {
                setCustomSecondaryArea(e.target.value);
                onChange('secondaryResearchArea', e.target.value);
              }}
              required
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Specialization/Keywords (Optional)</Label>
          <div className="flex gap-2">
            <Select value={selectedKeyword} onValueChange={(value) => {
              setSelectedKeyword(value);
              if (value !== 'Other') {
                addKeyword(value);
              }
            }}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select keywords" />
              </SelectTrigger>
              <SelectContent>
                {keywordOptions.map((keyword) => (
                  <SelectItem key={keyword} value={keyword}>
                    {keyword}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedKeyword === 'Other' && (
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom keyword"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addKeyword(customKeyword);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addKeyword(customKeyword)}
                disabled={!customKeyword.trim()}
              >
                Add
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeKeyword(keyword)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Describe Your Research Role (Optional)</Label>
          <Select value={selectedRole} onValueChange={(value) => {
            setSelectedRole(value);
            addRole(value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select research roles" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.researchRoles.map((role) => (
              <Badge key={role} variant="secondary" className="flex items-center gap-1">
                {role}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeRole(role)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? 'Creating Account...' : 'Finish'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupStep3;